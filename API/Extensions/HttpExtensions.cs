using Microsoft.AspNetCore.Http;
using API.Helpers;
using System.Text.Json;
namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPagintionHeader(this HttpResponse response, int currentPage,
         int itemsPerPage, int totalItems,int totalPages)
        {
            var paginationHeeader = new PaginationHeeader(currentPage, itemsPerPage, totalItems, totalPages);
            var options = new JsonSerializerOptions{
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeeader, options));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}