using ChromaArt.Server.DTOs.Posts;
using System.Collections.ObjectModel;
using System.Reflection;

namespace TypeScriptGenerator;
public static class TypeScriptInterfacesExtension
{
    private static readonly Type[] nonPrimitivesExcludeList =
    [
            typeof(object),
            typeof(string),
            typeof(decimal),
            typeof(void),
    ];
    private static readonly IDictionary<Type, string> convertedTypes = new Dictionary<Type, string>()
    {
        [typeof(string)] = "string",
        [typeof(char)] = "string",
        [typeof(byte)] = "number",
        [typeof(sbyte)] = "number",
        [typeof(short)] = "number",
        [typeof(ushort)] = "number",
        [typeof(int)] = "number",
        [typeof(uint)] = "number",
        [typeof(long)] = "number",
        [typeof(ulong)] = "number",
        [typeof(float)] = "number",
        [typeof(double)] = "number",
        [typeof(decimal)] = "number",
        [typeof(bool)] = "boolean",
        [typeof(object)] = "any",
        [typeof(void)] = "void",
    };

    public static async Task GenerateTypeScriptTypes(string outputPath)
    {
        if (Directory.Exists(outputPath))
        {
            Directory.Delete(outputPath, true);
        }

        Assembly assembly = typeof(PostDto).Assembly;
        Type[] typesToConvert = GetTypesToConvert(assembly);

        string fullPath = Path.Combine(outputPath, "index.d.ts");
        string? directory = Path.GetDirectoryName(fullPath);
        if (directory is not null && !Directory.Exists(directory))
        {
            Directory.CreateDirectory(directory);
        }

        using StreamWriter writer = new(fullPath, true);
        foreach (Type type in typesToConvert)
        {
            string[] lines = ConvertCs2Ts(type);
            await writer.WriteLineAsync(string.Join(Environment.NewLine, lines));
        }
    }
    private static Type[] GetTypesToConvert(Assembly assembly)
    {
        string mynamespace = "ChromaArt.Server.DTOs";
        var types = from t in assembly.GetTypes()
                    where t.IsClass && t.Namespace is not null && t.Namespace.Contains(mynamespace)
                    select t;

        return [.. types
            .Select(t => ReplaceByGenericArgument(t))
            .Where(t => !t.IsPrimitive && !nonPrimitivesExcludeList.Contains(t))
            .Distinct()];
    }
    private static Type ReplaceByGenericArgument(Type type)
    {
        if (type.IsArray)
        {
            return type.GetElementType();
        }
        if (!type.IsConstructedGenericType)
        {
            return type;
        }

        var genericArgument = type.GenericTypeArguments.First();

        var isTask = type.GetGenericTypeDefinition() == typeof(Task<>);
        var isEnumerable = typeof(IEnumerable<>).MakeGenericType(genericArgument).IsAssignableFrom(type);

        if (!isTask && !isEnumerable)
        {
            throw new InvalidOperationException();
        }

        if (genericArgument.IsConstructedGenericType)
        {
            return ReplaceByGenericArgument(genericArgument);
        }

        return genericArgument;
    }
    private static string[] ConvertCs2Ts(Type type)
    {
        Type[] types = GetAllNestedTypes(type);
        List<string> lines = [];

        foreach (Type t in types)
        {
            lines.Add($"");

            if (t.IsClass || t.IsInterface)
            {
                ConvertClassOrInterface(lines, t);
            }
            else if (t.IsEnum)
            {
                ConvertEnum(lines, t);
            }
            else
            {
                throw new InvalidOperationException();
            }
        }

        return [.. lines];
    }
    private static void ConvertClassOrInterface(IList<string> lines, Type type)
    {
        lines.Add($"export type {type.Name} = {{");

        foreach (PropertyInfo property in type.GetProperties().Where(p => p.GetMethod.IsPublic))
        {
            Type propType = property.PropertyType;
            Type? arrayType = GetArrayOrEnumerableType(propType);
            Type? nullableType = GetNullableType(propType);

            Type typeToUse = nullableType ?? arrayType ?? propType;


            var convertedType = ConvertType(typeToUse);

            string suffix = "";
            suffix = arrayType != null ? "[]" : suffix;
            suffix = nullableType != null ? "|null" : suffix;

            lines.Add($"  {CamelCaseName(property.Name)}: {convertedType}{suffix};");
        }

        lines.Add($"}}");
    }
    private static string ConvertType(Type typeToUse)
    {
        if (convertedTypes.ContainsKey(typeToUse))
        {
            return convertedTypes[typeToUse];
        }

        if (typeToUse.IsConstructedGenericType && typeToUse.GetGenericTypeDefinition() == typeof(IDictionary<,>))
        {
            var keyType = typeToUse.GenericTypeArguments[0];
            var valueType = typeToUse.GenericTypeArguments[1];
            return $"{{ [key: {ConvertType(keyType)}]: {ConvertType(valueType)} }}";
        }

        return typeToUse.Name;
    }
    private static void ConvertEnum(IList<string> lines, Type type)
    {
        var enumValues = type.GetEnumValues().Cast<int>().ToArray();
        var enumNames = type.GetEnumNames();

        lines.Add($"export enum {type.Name} {{");

        for (int i = 0; i < enumValues.Length; i++)
        {
            lines.Add($"  {enumNames[i]} = {enumValues[i]},");
        }

        lines.Add($"}}");
    }
    private static Type[] GetAllNestedTypes(Type type)
    {
        return [type, .. type.GetNestedTypes().SelectMany(nt => GetAllNestedTypes(nt))];
    }
    private static Type? GetArrayOrEnumerableType(Type type)
    {
        if (type.IsArray)
        {
            return type.GetElementType();
        }
        else if (type.IsConstructedGenericType)
        {
            Type typeArgument = type.GenericTypeArguments.First();

            if (typeof(IEnumerable<>).MakeGenericType(typeArgument).IsAssignableFrom(type))
            {
                return typeArgument;
            }
        }
        return null;
    }
    private static Type? GetNullableType(Type type)
    {
        if (type.IsConstructedGenericType)
        {
            Type typeArgument = type.GenericTypeArguments.First();

            if (typeArgument.IsValueType && typeof(Nullable<>).MakeGenericType(typeArgument).IsAssignableFrom(type))
            {
                return typeArgument;
            }
        }
        return null;
    }
    private static string CamelCaseName(string pascalCaseName)
    {
        return pascalCaseName[0].ToString().ToLower() + pascalCaseName.Substring(1);
    }
}