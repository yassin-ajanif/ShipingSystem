using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Exceptions
{
    public class CustomException : Exception
    {

        public CustomException(Exception ex,string customMessage,ILogger logger) : base(customMessage)
        {

            logger.LogError($"Custom Exception is : {ex.Message} ",ex, customMessage);
        }
        
    }
}
