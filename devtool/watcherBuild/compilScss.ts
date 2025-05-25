import * as chokidar from 'chokidar';
import path from 'path';
import fs from 'fs';
import * as sass from 'sass';


const compilScss = {

inputPath : path.join(import.meta.dirname,'src','public' ,'style','main.scss'),
outputPath : path.join(import.meta.dirname,'build','public' ,'style','main.css'),
  
    compil(){
        try{
            const output = sass.compile(this.inputPath);
           fs.writeFileSync(this.outputPath, output.css);
        }
        catch (err) {
    console.error('Erreur de compilation Sass:', err);
        }
    }
}








async function copyEjs() {

}