'use strict';
const vscode = require("vscode");
class TimePeriodController {
    constructor(timeCalculator) {
        this._timeCalculator = timeCalculator;
        // Create as needed
        if (!this._statusBarItem) {
            this._statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        }
        // subscribe to selection change and editor activation events
        const subscriptions = [];
        vscode.window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions);
        vscode.window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions);
        // update the counter for the current file
        this.updateTimePeriod();
        // create a combined disposable from both event subscriptions
        this._disposable = vscode.Disposable.from(...subscriptions);
    }
    dispose() {
        this._statusBarItem.dispose();
        this._disposable.dispose();
    }
    updateTimePeriod() {
        // Get the current text editor
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            this._statusBarItem.hide();
            return;
        }
        const doc = editor.document;
        // Only update status if an log file
        if (doc.languageId === 'log') {
            this._statusBarItem.text = '';
            const startLineNumber = editor.selection.start.line;
            const endLineNumber = editor.selection.end.line;
            let timePeriod;
            if (startLineNumber !== endLineNumber) {
                // Get the selections first and last non empty line
                const startLine = doc.lineAt(startLineNumber);
                let endLine;
                // If last line is not partially selected use last but first line
                if (editor.selection.end.character === 0) {
                    // Because startLineNumber !== endLineNumber, endLineNumber - 1 >= 0 holds
                    endLine = doc.lineAt(endLineNumber - 1);
                }
                else {
                    endLine = doc.lineAt(endLineNumber);
                }
                timePeriod = this._timeCalculator.getTimePeriod(startLine.text, endLine.text);
            }
            if (timePeriod !== undefined) {
                // Update the status bar
                this._statusBarItem.text = this._timeCalculator.convertToDisplayString(timePeriod);
                this._statusBarItem.show();
            }
            else {
                this._statusBarItem.hide();
            }
        }
        else {
            this._statusBarItem.hide();
        }
    }
    _onEvent() {
        this.updateTimePeriod();
    }
}
module.exports = TimePeriodController;
//# sourceMappingURL=TimePeriodController.js.map