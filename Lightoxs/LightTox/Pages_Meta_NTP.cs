//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Lightoxs
{
    using System;
    using System.Collections.Generic;
    
    public partial class Pages_Meta_NTP
    {
        public int PageID { get; set; }
        public int MetaID { get; set; }
        public string Value { get; set; }
    
        public virtual MetaTag MetaTag { get; set; }
        public virtual PagesNTP PagesNTP { get; set; }
    }
}
