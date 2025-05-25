import ts from 'typescript';
import path from 'path';

export class TypeScriptCompiler {
  private configPath: string;
  private parsedConfig: ts.ParsedCommandLine;

  constructor(configPath: string) {
    this.configPath = configPath;
    const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
    if (configFile.error) {
      throw new Error(`Erreur lecture tsconfig: ${ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n')}`);
    }
    this.parsedConfig = ts.parseJsonConfigFileContent(
      configFile.config,
      ts.sys,
      path.dirname(configPath)
    );
  }

  compile(filePath: string): boolean {
    const program = ts.createProgram([filePath], this.parsedConfig.options);
    const emitResult = program.emit();

    const diagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
    if (diagnostics.length > 0) {
      diagnostics.forEach(diagnostic => {
        if (diagnostic.file && diagnostic.start !== undefined) {
          const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
          const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
          console.error(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        } else {
          console.error(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
        }
      });
      return false;
    }

    return !emitResult.emitSkipped;
  }
}