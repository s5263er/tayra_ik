namespace Tayra_IK.Models
{
    public class JwtConfig
    {
        public string SecretKey { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
    }
}