//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Proyecto.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class SocialNetworksStudent
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> CreateAt { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public Nullable<int> SocialNetworksNameId { get; set; }
        public Nullable<int> StudentId { get; set; }
    
        public virtual Users Users { get; set; }
        public virtual Users Users1 { get; set; }
        public virtual Student Student { get; set; }
        public virtual SocialNetworksCatalog SocialNetworksCatalog { get; set; }
        public virtual Student Student1 { get; set; }
    }
}
