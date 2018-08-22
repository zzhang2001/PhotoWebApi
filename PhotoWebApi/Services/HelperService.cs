using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoWebApi.Services
{
    public interface IHelperService
    {
        string GetModelStateErrorsString(ModelStateDictionary modelStateDictionary);
    }

    public class HelperService : IHelperService
    {
        // Concatenate all model state error messages into a single string.
        public string GetModelStateErrorsString(ModelStateDictionary modelStateDictionary)
        {
            List<string> lstErrMsg = modelStateDictionary.Values
                .SelectMany(entry => entry.Errors)
                .Select(error => error.ErrorMessage)
                .ToList();
            string strErrors = string.Empty;
            lstErrMsg.ForEach(str => strErrors += str + " ");
            strErrors = strErrors.Trim();
            return strErrors;
        }
    }
}
