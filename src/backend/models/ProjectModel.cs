using System.Data.SqlTypes;

namespace backend.sql

{
    public class ProjectModel 

    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Status { get; set; }

        public string location { get; set; }

        public DateTime LastUpdate { get; set; }
        // change in ER diagram

    }
}