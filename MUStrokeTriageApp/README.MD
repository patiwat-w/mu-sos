// ...existing code...

## Create a Migration and Apply it to Create the Subjects Table

### Create a Migration
Open a terminal or command prompt and navigate to the project directory. Then run the following command to create a migration:

# Navigate to the project directory
cd /d:/MU/Sources/MUStrokeTriageApp

# Install the Microsoft.EntityFrameworkCore.Design package
dotnet add package Microsoft.EntityFrameworkCore.Design

# Add a migration specifying the DbContext (replace YourDbContext with the actual DbContext name)
dotnet ef migrations add CreateSubjectsTable --context YourDbContext

If you encounter a build error, run the following command to see the detailed errors:

```sh
dotnet build
```

Fix any errors that are reported and then try creating the migration again.

### Apply the Migration
Run the following command to apply the migration and create the table in the database:

```sh
dotnet ef database update --context YourDbContext
```

### Add a New Migration for Pending Model Changes
If you encounter a warning about pending model changes, run the following commands to add a new migration and update the database:

# Add a new migration specifying the DbContext (replace YourDbContext with the actual DbContext name)
dotnet ef migrations add UpdateSubjectModel --context YourDbContext

# Update the database specifying the DbContext
dotnet ef database update --context YourDbContext

These steps will create the Subjects table in your database using the code-first approach and handle any pending model changes.

## Build and Deploy

### Build the Project
To build the project, run the following command:

```sh
dotnet build
```

This will compile the project and generate the necessary binaries.

### Deploy the Project
To deploy the project, you can publish it to a folder or a hosting service. Run the following command to publish the project to a folder:

```sh
dotnet publish MUStrokeTriageApp.csproj -c Release -o ./publish
```

This will create a `publish` folder with the compiled project files.

### Additional Deployment Options
You can also deploy the project to a hosting service such as Azure, AWS, or any other cloud provider. Refer to the specific hosting service documentation for detailed deployment instructions.

// ...existing code...
