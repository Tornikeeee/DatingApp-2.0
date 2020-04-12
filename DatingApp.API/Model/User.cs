namespace DatingApp.API.Model
{
    public class User
    {
        public int id { get; set; } 
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }   
        public byte[] PasswordSalt { get; set; } 
    }
}