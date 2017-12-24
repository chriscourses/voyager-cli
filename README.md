<p align="center"><img src="http://chriscourses.com/images/cc-voyager.svg"></p>

## voyager-cli

A command line interface (CLI) for generating [Voyager](https://github.com/chriscourses/voyager) apps.

**Installation**

To gain access to the `voyager` executable, install the voyager-cli globally with the following:

``` bash
$ npm install -g voyager-cli
```

## Usage

``` bash
$ voyager <command> [options]
```

**Commands:**

``` bash
$ voyager new [options] <project-name>  # create new project
$ voyager start [options]               # launch project
```

**Options:**

``` bash
-V, --version  # output the version number
-h, --help     # output usage information
```

**Examples:**

``` bash
$ voyager new app --auth  # creates a new app with user auth 
$ voyager start           # starts up the voyager server
```


## License

Voyager CLI is an open-source software running under the [MIT License](https://opensource.org/licenses/MIT).
