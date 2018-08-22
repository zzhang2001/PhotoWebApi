﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using PhotoWebApi.Models;
using PhotoWebApi.Services;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace PhotoWebApi.Controllers
{
    [Route("api/Auth")]
    public class AuthController : Controller
    {
        // JWT authentication controller
        // Error is returned as a string processed from ModelState object.
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly ILogger<AuthController> _logger;
        private readonly IHelperService _helperService;

        public AuthController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ITokenService tokenService,
            ILogger<AuthController> logger,
            IHelperService helperService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _logger = logger;
            _helperService = helperService;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            string strErrors;

            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    _logger.LogInformation($"User {model.Email} created a new account with password.");
                    return Json(_tokenService.GenerateToken(model.Email));
                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
                strErrors = _helperService.GetModelStateErrorsString(ModelState);
                return BadRequest(strErrors);
            }
            // ModelState is invalid.
            strErrors = _helperService.GetModelStateErrorsString(ModelState);
            return BadRequest(strErrors);
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            string strErrors;

            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
                if (result.Succeeded)
                {
                    _logger.LogInformation($"User {model.Email} logged in.");
                    // Sign out to remove authentication cookie generated by the Sign In Manager. JWT authentication is used instead.
                    await _signInManager.SignOutAsync();
                    return Json(_tokenService.GenerateToken(model.Email));
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                    strErrors = _helperService.GetModelStateErrorsString(ModelState);
                    return BadRequest(strErrors);
                }
            }
            // ModelState is invalid.
            strErrors = _helperService.GetModelStateErrorsString(ModelState);
            return BadRequest(strErrors);
        }
    }
}