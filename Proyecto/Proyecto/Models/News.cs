﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Proyecto.Models
{
    public class News
    {
        public News()
        {
            
        }

        public int Id { get; set; }
        public int AuthorId { get; set; }
        public string AuthorName { get; set; }
        public string DateTime { get; set; }
        public string Text { get; set; }
        public string Title { get; set; }

        
    }
}