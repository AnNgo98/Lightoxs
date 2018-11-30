using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using Lightoxs.Model;

namespace Lightoxs.Model
{
    public static class CommonFunction
    {
        public static string getExtensionFileName(string nameOfFile)
        {
            string result = "";

            for (int i = nameOfFile.Length - 1; i >= 0; i--)
            {
                if(nameOfFile[i] == '.')
                {
                    result = "." + result;
                    break;
                }
                else
                {
                    result = nameOfFile[i] + result;
                }
            }

            return result;
        }

        public static string hashSHA256(string inputData)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                // ComputeHash - returns byte array  
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(inputData + BCrypt.GenerateSalt()));

                // Convert byte array to a string   
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}