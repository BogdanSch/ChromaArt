namespace ChromaArt.Server.Helpers;

public static class DateHelper
{
    public static readonly string DATE_TIME_FORMAT = "yyyy-MM-ddTHH:mm:ss";
    public static string GetDateTimeInStringFormat(DateTime dateTime) => dateTime.ToString(DATE_TIME_FORMAT);
    public static string GetCurrentDateTimeInStringFormat() => GetDateTimeInStringFormat(DateTime.UtcNow);
}
