using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace Lightoxs.Model
{
    public class CommonFunction
    {
        #region SingleTon
        private CommonFunction()
        {

        }

        /// <summary>
        /// The instance
        /// </summary>
        private static CommonFunction instance;

        /// <summary>
        /// Gets the instance.
        /// </summary>
        /// <value>
        /// The instance.
        /// </value>
        public static CommonFunction Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new CommonFunction();
                }
                return instance;
            }
        }

        /// <summary>
        /// Removes the unicode text.
        /// </summary>
        /// <param name="text">The text.</param>
        /// <returns></returns>
        public string RemoveUnicode(string text)
        {
            string[] arr1 = new string[] { "á", "à", "ả", "ã", "ạ", "â", "ấ", "ầ", "ẩ", "ẫ", "ậ", "ă", "ắ", "ằ", "ẳ", "ẵ", "ặ",
                "đ","é","è","ẻ","ẽ","ẹ","ê","ế","ề","ể","ễ","ệ","í","ì","ỉ","ĩ","ị","ó","ò","ỏ","õ","ọ","ô","ố","ồ","ổ","ỗ","ộ",
                "ơ","ớ","ờ","ở","ỡ","ợ","ú","ù","ủ","ũ","ụ","ư","ứ","ừ","ử","ữ","ự","ý","ỳ","ỷ","ỹ","ỵ",};
            string[] arr2 = new string[] { "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a",
                "a", "a", "a", "a","d","e","e","e","e","e","e","e","e","e","e","e","i","i","i","i","i","o",
                "o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","u","u","u","u","u","u","u",
                "u","u","u","u","y","y","y","y","y",};
            for (int i = 0; i < arr1.Length; i++)
            {
                text = text.Replace(arr1[i], arr2[i]);
                text = text.Replace(arr1[i].ToUpper(), arr2[i].ToUpper());
            }

            text = RemoveSpecialCharacters(text);

            return text;
        }

        private string RemoveSpecialCharacters(string str)
        {
            StringBuilder sb = new StringBuilder();
            foreach (char c in str)
            {
                if ((c >= '0' && c <= '9') || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || c == '-' || c == ' ' || c == '_')
                {
                    sb.Append(c);
                }
            }
            return sb.ToString();
        }

        public string getExtensionFileName(string nameOfFile)
        {
            string result = "";

            for (int i = nameOfFile.Length - 1; i >= 0; i--)
            {
                if (nameOfFile[i] == '.')
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
        #endregion

    }
}