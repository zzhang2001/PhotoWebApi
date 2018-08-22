using System;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace PhotoWebApi.Services
{
    public interface ITokenService
    {
        string GenerateToken(string strEmail);
    }

    public class TokenService : ITokenService
    {
        IConfiguration  _configuration;
        string _secretKey { get; set; }
        string _issuer { get; set; }
        string _audience { get; set; }

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
            _secretKey = _configuration["JwtOptions:SecretKey"];
            _issuer = _configuration["JwtOptions:Issuer"];
            _audience = _configuration["JwtOptions:Audience"];
        }

        // Generate a JWT token.
        public string GenerateToken(string strEmail)
        {
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            Claim[] claims = new Claim[]
            {
            new Claim(ClaimTypes.Name, strEmail),
            new Claim(ClaimTypes.Email, strEmail)
            };
            JwtSecurityToken token = new JwtSecurityToken(
                issuer: _issuer,
                audience: _audience,
                claims: claims,
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
                );
            JwtSecurityTokenHandler jwtTokenHandler = new JwtSecurityTokenHandler();
            string jwtToken = jwtTokenHandler.WriteToken(token);
            return jwtToken;
        }
    }
}
