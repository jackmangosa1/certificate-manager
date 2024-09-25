using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;

namespace BookAPI.Utilities
{
    public class GlobalExceptionHandler : IExceptionHandler
    {
        private readonly ILogger<GlobalExceptionHandler> _logger;

        public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
        {
            _logger = logger;
        }

        public async ValueTask<bool> TryHandleAsync(
            HttpContext httpContext,
            Exception exception,
            CancellationToken cancellationToken)
        {
            _logger.LogError(exception, "An unhandled exception has occurred.");

            int statusCode = StatusCodes.Status500InternalServerError;
            string errorMessage = "An error occurred while processing your request.";

            if (exception is KeyNotFoundException)
            {
                statusCode = StatusCodes.Status404NotFound;
                errorMessage = "The requested resource was not found.";
            }
            else if (exception is ArgumentException)
            {
                statusCode = StatusCodes.Status400BadRequest;
                errorMessage = "Invalid argument provided.";
            }
            else if (exception is DbUpdateConcurrencyException)
            {
                statusCode = StatusCodes.Status409Conflict;
                errorMessage = "Concurrency conflict occurred. The data you are trying to modify has been changed by another process.";
            }
            else if (exception is DbUpdateException)
            {
                errorMessage = "Database update error. An error occurred while saving changes to the database.";
            }
            else if (exception is InvalidOperationException)
            {
                statusCode = StatusCodes.Status400BadRequest;
                errorMessage = "Invalid operation.";
            }

            if (httpContext.RequestServices.GetRequiredService<IHostEnvironment>().IsDevelopment())
            {
                errorMessage += $" Exception details: {exception}";
            }

            httpContext.Response.StatusCode = statusCode;
            var errorResponse = new
            {
                Status = statusCode,
                Message = errorMessage
            };
            await httpContext.Response.WriteAsJsonAsync(errorResponse, cancellationToken);
            return true;
        }
    }
}
