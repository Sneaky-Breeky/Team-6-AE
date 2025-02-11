using System.ComponentModel.DataAnnotations;

namespace backend.auth 
{
    public class UserModel
    {
        [Key]
        public int Id {get; set;}

        [Required]
        public string Email {get; set;}

        [Required]
        public string PasswordHash {get; set;}
    }
}