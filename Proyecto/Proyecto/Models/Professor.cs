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
    
    public partial class Professor
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Professor()
        {
            this.ProfessorCourse = new HashSet<ProfessorCourse>();
            this.SocialNetworksProfessor1 = new HashSet<SocialNetworksProfessor>();
            this.PrivateMessage = new HashSet<PrivateMessage>();
            this.PublicConsultation = new HashSet<PublicConsultation>();
            this.RepliesPublicConsultation = new HashSet<RepliesPublicConsultation>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Mail { get; set; }
        public Nullable<int> AcademicDegreeId { get; set; }
        public string Image { get; set; }
        public Nullable<int> LocationId { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> CreateAt { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
    
        public virtual AcademicDegree AcademicDegree { get; set; }
        public virtual Location Location { get; set; }
        public virtual Users Users { get; set; }
        public virtual Users Users1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProfessorCourse> ProfessorCourse { get; set; }
        public virtual Users Users2 { get; set; }
        public virtual SocialNetworksProfessor SocialNetworksProfessor { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SocialNetworksProfessor> SocialNetworksProfessor1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PrivateMessage> PrivateMessage { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PublicConsultation> PublicConsultation { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RepliesPublicConsultation> RepliesPublicConsultation { get; set; }
    }
}
