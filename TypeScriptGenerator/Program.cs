using TypeScriptGenerator;

string tsDefinitionsPath = Path.GetFullPath("./ClientModels/");
await TypeScriptInterfacesExtension.GenerateTypeScriptTypes(tsDefinitionsPath);

Console.WriteLine("TypeScript types generated successfully.");
Console.Write("Generated classes are available at: ");
Console.ForegroundColor = ConsoleColor.Green;
Console.WriteLine(tsDefinitionsPath);
Console.ResetColor();