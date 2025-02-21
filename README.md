# Team-6-AE

# Team Free Labour

## Backend

We will use C# for backend. Here is several usefull command:

1. `dotnet build` to compile your code, restore dependencies, and to update `bin/` abd `obj/` directories (generate intermediate input)

1. `dotnet new console` to generate .csproj file to its corresponding root directory

1. `dotnet add dependencies` to add .csproj file to its corresponding test unit

1. `dotnet test` runs unit tests in a .NET project using a test framework like MSTest, NUnit, or xUnit (I am thinking of using Xunit, since it is the simplest one). It builds the test project first and executes tests.  
    1. `dotnet test --filter yourClassName` only run test on given file name
    1. `dotnet test --logger "console;verbosity=normal"`
    1. `IClassFixture<T>` Is one convenient way to do Before all and After all in C# since we are using Xunit. Will add usage example later.

    ## Database

    ## Frontend

`npm install`

`npm start`


To login as user:

user@gmail.com

password

To login as admin:

admin@gmail.com

password
