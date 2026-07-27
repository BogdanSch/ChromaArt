using TypeScriptGenerator;

string tsDefinitionsPath = Path.GetFullPath("./ClientModels/");
await TypeScriptInterfacesExtension.GenerateTypeScriptTypes(tsDefinitionsPath);

Console.WriteLine("TypeScript types generated successfully.");