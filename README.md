# ILI File Highlighter


![alt text][sample]

## Description
A Visual Studio Code extension for adding color highlighting to INTERLIS 2.4 files. The colors are customizable but by default the current color theme's colors are used.

**Note**

## Features
### Syntax Highlighting
The extension associates with `.ILI` files and applies coloring to the different elements in the file, for example:

* Object names like
    * `TOPIC`
    * `MODEL`
    * `CLASS`
* Data types like
    * `BOOLEAN`
    * `INT`
    * `TEXT`
* Keywords like
    * `ASSOCIATION`
    * `ABSTRACT`
    * `EXTENDS`
* String patterns like
    * `{...}`


### File associations

To make VS Code treat other file extensions than the default `.ili` as INTERLIS2 files, add the following to the user settings:

```JSON
"files.associations": {
    "*.ili*": "INTERLIS2"
},
```
The example above associates extensions such as `.ili` with the INTERLIS2 File highlighter extension.


[sample]: https://github.com/olivergrimm/vsc_interlis2_extension/blob/master/images/snipped.PNG?raw=true
