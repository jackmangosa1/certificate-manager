using System.Reflection;

namespace CertificateManagerAPI.Utilities
{
    public class SearchCriteriaValidator
    {
        public static bool IsSearchCriteriaEmpty<T>(T searchCriteria)
        {
            if (searchCriteria == null)
            {
                return true;
            }

            var properties = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);

            foreach (var property in properties)
            {
                if (property.PropertyType == typeof(string))
                {
                    var value = property.GetValue(searchCriteria) as string;
                    if (!string.IsNullOrWhiteSpace(value))
                    {
                        return false;
                    }
                }
            }

            return true;
        }
    }
}
