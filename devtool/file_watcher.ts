import * as chokidar from 'chokidar';
import path from 'path';
import fs from 'fs/promises';
import * as sass from 'sass';
import { logger } from './utils/logger.ts';
import { TypeScriptCompiler } from './watcherBuild/transpilTS.ts';
import { exec } from 'child_process';

const tsCompiler = new TypeScriptCompiler(path.resolve(import.meta.dirname, '../config/tsconfig.json'));

interface File {
  name: string;
  fpath: string;
  extension: string;
}

const buffer: Record<string, File[]> = {
  '.ts': [],
  '.ejs': [],
  '.scss': [],
};

class Bouncer {
  private timeoutId?: ReturnType<typeof setTimeout>;
  constructor(
    public timer: number,
    public callback: () => void
  ) {}
  trigger() {
    this.clear();
    this.timeoutId = setTimeout(this.callback, this.timer);
  }
  clear() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }
}

const bouncers: Record<string, Bouncer> = {
  '.ts': new Bouncer(300, () => processBuffer('.ts')),
  '.ejs': new Bouncer(200, () => processBuffer('.ejs')),
  '.scss': new Bouncer(200, () => processBuffer('.scss')),
};
const projectRoot = path.resolve(); // Point de départ du projet
const compilScss = {
  state: 'waiting' as 'waiting' | 'working',
  inputPath: path.join(projectRoot, 'src', 'public', 'style', 'main.scss'),
  outputPath: path.join(projectRoot, 'build', 'public', 'style', 'main.css'),
  async compil() {
    if (this.state === 'working') return;
    this.state = 'working';
    try {
      const output = await sass.compileAsync(this.inputPath);
      await fs.mkdir(path.dirname(this.outputPath), { recursive: true });
      await fs.writeFile(this.outputPath, output.css);
      logger.success('Sass compilé : main.scss');
    } catch (err) {
      logger.error('Erreur de compilation Sass: ' + (err as Error).message);
    } finally {
      this.state = 'waiting';
    }
  },
};

const dispatcher: Record<string, { process: (file: File) => void }> = {
  '.ts': {
    process: (file) => {
      if (file.name === '') return;
      const success = tsCompiler.compile(file.fpath);
      if (success) logger.success(`TS compilé : ${file.name}`);
      else logger.error(`Erreur compilation TS : ${file.name}`);
    },
  },
  '.ejs': {
    process: async (file) => {
      const dest = file.fpath.replace('src', 'build');
      await fs.mkdir(path.dirname(dest), { recursive: true });
      await fs.copyFile(file.fpath, dest);
      logger.success(`EJS copié : ${file.name}`);
    },
  },
  '.scss': {
    process: () => compilScss.compil(),
  },
};

function processBuffer(ext: string) {
  const files = [...buffer[ext]];
  buffer[ext] = [];

  files.forEach(file => {
    dispatcher[ext].process(file);
  });

  if (ext === '.scss') {
    dispatcher['.scss'].process(files[0]);
  }
}



const watcher = chokidar.watch('./src', {
  persistent: true,
  ignoreInitial: true,
});

watcher.on('add', onChangeOrAdd);
watcher.on('change', onChangeOrAdd);

function onChangeOrAdd(filePath: string) {
  const extension = path.extname(filePath);
  if (!['.ts', '.ejs', '.scss'].includes(extension)) return;

  const file: File = {
    name: path.basename(filePath),
    fpath: filePath,
    extension,
  };

  buffer[extension].push(file);
  bouncers[extension].trigger();
  logger.debug(`🕵️ Event add/change sur ${file.fpath}`);
}

watcher.on('ready', () => {
  logger.success('🚀 Watcher prêt et à l’écoute sur ./src !');
});

