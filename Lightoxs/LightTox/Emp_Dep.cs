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
    
    public partial class Emp_Dep
    {
        public int DepID { get; set; }
        public int EmpID { get; set; }
        public int PosID { get; set; }
        public string Description { get; set; }
    
        public virtual Department Department { get; set; }
        public virtual Employee Employee { get; set; }
        public virtual Position Position { get; set; }
    }
}
