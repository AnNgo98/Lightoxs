using System.Text;

namespace BookLibraryCommon
{
    public class StringUrl
    {
        /// <summary>
        /// Convert a string become Url 
        /// </summary>
        /// <param name="strInput"></param>
        /// <returns></returns>
        public static string UrlFriendly(string strInput)
        {
            //String is null return emtry
            if (strInput == null) return "";
            //Maxinum length 64 character
            const int maxlen = 64;
            //declare bariable is length of string
            int len = strInput.Length;
            bool prevdash = false;
            var sb = new StringBuilder(len);
            char c;
            //Loot from fisrt character to last character
            for (int i = 0; i < len; i++)
            {
                c = strInput[i];
                //Character special
                if ((c >= 'a' && c <= 'z') || (c >= '0' && c <= '9'))
                {
                    //Add 'c' to string
                    sb.Append(c);
                    prevdash = false;
                }
                //Upper to lower character
                else if (c >= 'A' && c <= 'Z')
                {
                    // Way to convert to lowercase
                    sb.Append((char)(c | 32));
                    prevdash = false;
                }
                //Character special covert to '-'
                else if (c == ' ' || c == ',' || c == '.' || c == '/' ||
                    c == '\\' || c == '-' || c == '_' || c == '=')
                {
                    if (!prevdash && sb.Length > 0)
                    {
                        //Add '-' to string
                        sb.Append('-');
                        prevdash = true;
                    }
                }
                //Code Ascii >= 128 covert character no market
                else if ((int)c >= 128)
                {
                    int prevlen = sb.Length;
                    //Call method CharToAscii
                    //Parameter is character c
                    //Return character c is coverted to no market
                    sb.Append(CharToAscii(c));
                    if (prevlen != sb.Length) prevdash = false;
                }
                //Break when loop to last character
                if (i == maxlen) break;
            }

            if (prevdash)
                return sb.ToString().Substring(0, sb.Length - 1);
            else
                return sb.ToString();
        }

        /// <summary>
        /// Character market covert to no market.
        /// </summary>
        /// <param name="strInput"></param>
        /// <returns></returns>
        public static string NoSignFormat(string strInput)
        {
            if (strInput == null) return "";
            strInput = strInput.Trim();
            const int maxlen = 80;
            int len = strInput.Length;
            bool prevdash = false;
            var sb = new StringBuilder(len);
            char c;

            for (int i = 0; i < len; i++)
            {
                c = strInput[i];
                //Character in Latin alphabet 
                if ((c >= 'a' && c <= 'z') || (c >= '0' && c <= '9'))
                {
                    sb.Append(c);
                    prevdash = false;
                }
                //Upper to lower character
                else if (c >= 'A' && c <= 'Z')
                {
                    // tricky way to convert to lowercase
                    sb.Append((char)(c | 32));
                    prevdash = false;
                }
                //Character special covert to '-'
                else if (c == ' ' || c == ',' || c == '.' || c == '/' ||
                    c == '\\' || c == '-' || c == '_' || c == '=')
                {
                    if (!prevdash && sb.Length > 0)
                    {
                        //Add ' ' to string
                        sb.Append(' ');
                        prevdash = true;
                    }
                }
                //covert from character market to character no market
                else if ((int)c >= 128)
                {
                    int prevlen = sb.Length;
                    //Call method CharToAscii
                    //Parameter is character c
                    //Return character c is coverted to no market
                    sb.Append(CharToAscii(c));
                    if (prevlen != sb.Length) prevdash = false;
                }
                if (i == maxlen) break;
            }

            if (prevdash)
                return sb.ToString().Substring(0, sb.Length - 1);
            else
                return sb.ToString();
        }

        /// <summary>
        /// Convert from a character to character no marked
        /// </summary>
        /// <param name="c"></param>
        /// <returns></returns>
        public static string CharToAscii(char c)
        {
            //Character a
            string s = c.ToString().ToLowerInvariant();
            if ("àåáâäãåąảãạấẩẫầăặằắẳẵậ".Contains(s))
            {
                return "a";
            }
            //Character e
            else if ("èéêëęẻẽẹếềểễệ".Contains(s))
            {
                return "e";
            }
            //Character i
            else if ("ìíîïıịỉĩ".Contains(s))
            {
                return "i";
            }
            //Character o
            else if ("òọỏóôõöøőðơớởợỡờốồộổỗ".Contains(s))
            {
                return "o";
            }
            //Character u
            else if ("ùúûüŭůủũụưứừửữự".Contains(s))
            {
                return "u";
            }
            //Character c
            else if ("çćčĉ".Contains(s))
            {
                return "c";
            }
            //Character z
            else if ("żźž".Contains(s))
            {
                return "z";
            }
            //Character s
            else if ("śşšŝ".Contains(s))
            {
                return "s";
            }
            //Character n
            else if ("ñń".Contains(s))
            {
                return "n";
            }
            //Character y
            else if ("ýÿỹỳỷỵ".Contains(s))
            {
                return "y";
            }
            //Character g
            else if ("ğĝ".Contains(s))
            {
                return "g";
            }
            //Character d
            else if ("đ".Contains(s))
            {
                return "d";
            }
            //Character r
            else if (c == 'ř')
            {
                return "r";
            }
            //Character l
            else if (c == 'ł')
            {
                return "l";
            }
            //Character d
            else if (c == 'đ')
            {
                return "d";
            }
            //Character ss
            else if (c == 'ß')
            {
                return "ss";
            }
            //Character th
            else if (c == 'Þ')
            {
                return "th";
            }
            //Character h
            else if (c == 'ĥ')
            {
                return "h";
            }
            //Character j
            else if (c == 'ĵ')
            {
                return "j";
            }
            else
            {
                return "";
            }
        }
    }
}
