using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using PhotoWebApi.Models;
using PhotoWebApi.Services;
using System.IO;

namespace PhotoWebApi.Controllers
{
    [Route("api/Photo")]
    public class PhotoController : Controller
    {
        PhotoDbContext _dbContext;
        private readonly IHelperService _helperService;

        public PhotoController(PhotoDbContext dbContext, IHelperService helperService)
        {
            _dbContext = dbContext;
            _helperService = helperService;
        }

        [HttpGet]
        [Route("GetAllPhotos")]
        public IEnumerable<PhotoDTO> GetAllPhotos()
        {
            List<Photo> photos = _dbContext.Photos.ToList();
            List<PhotoDTO> photoDTOs = new List<PhotoDTO>();
            photos.ForEach(photo =>
            {
                PhotoDTO pd = new PhotoDTO
                {
                    PhotoId = photo.PhotoId,
                    Title = photo.Title,
                    FileName = photo.FileName,
                    ImageMimeType = photo.ImageMimeType,
                    Description = photo.Description,
                    UserName = photo.UserName,
                    CreatedDate = photo.CreatedDate,
                    ModifiedDate = photo.ModifiedDate,
                    RelatedComments = new List<CommentDTO>()
                };
                photoDTOs.Add(pd);
            });
            return photoDTOs;
        }

        [HttpGet]
        [Route("GetImage/{id}")]
        public IActionResult GetImage(int id)
        {
            Photo photo = _dbContext.Photos.FirstOrDefault(p => p.PhotoId == id);
            if (photo != null)
            {
                return File(photo.FileData, photo.ImageMimeType);
            }
            else
            {
                return NotFound();
            }
        }

        // To use only JWT authentication scheme for this action.
        // This will disable cookie authentication scheme used by ASP.NET Core Identity.
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost()]
        [Route("AddPhoto")]
        public IActionResult AddPhoto(string title, string description, IFormFile file)
        {
            Photo p = new Photo
            {
                Title = title,
                Description = description,
                UserName = User.Identity.Name,
                CreatedDate = DateTime.Now,
                ModifiedDate = DateTime.Now
            };
            if (file != null && file.Length > 0)
            {
                p.FileName = file.FileName;
                p.ImageMimeType = file.ContentType;
                p.FileData = new byte[file.Length];
                using (var stream = file.OpenReadStream())
                {
                    stream.Read(p.FileData, 0, (int)file.Length);
                }
                // Add the photo to the database.
                _dbContext.Photos.Add(p);
                _dbContext.SaveChanges();
                return Ok();
            }

            ModelState.AddModelError("", "File is not received by the server!");
            string strErrors = _helperService.GetModelStateErrorsString(ModelState);
            return BadRequest(strErrors);
        }

        [HttpGet]
        [Route("GetPhoto/{id}")]
        public IActionResult GetPhotoAndComments(int id)
        {
            Photo photo = _dbContext.Photos.Include(p => p.RelatedComments).FirstOrDefault(p => p.PhotoId == id);
            if (photo != null)
            {
                // A data transfer object (DTO) has to be constructed to prevent from json serialization circular reference issue.
                PhotoDTO pd = new PhotoDTO
                {
                    PhotoId = photo.PhotoId,
                    Title = photo.Title,
                    FileName = photo.FileName,
                    ImageMimeType = photo.ImageMimeType,
                    Description = photo.Description,
                    UserName = photo.UserName,
                    CreatedDate = photo.CreatedDate,
                    ModifiedDate = photo.ModifiedDate,
                    RelatedComments = photo.RelatedComments.Select(c => new CommentDTO
                    {
                        CommentId = c.CommentId,
                        PhotoId = c.PhotoId,
                        UserName = c.UserName,
                        Body = c.Body,
                        CreatedDate = c.CreatedDate
                    }).ToList()
                };
                return Ok(pd);
            }
            else
            {
                return NotFound();
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        [Route("UpdatePhoto")]
        public IActionResult UpdatePhoto([FromBody] PhotoDTO updatedPhoto)
        {
            Photo photo = _dbContext.Photos.FirstOrDefault(p => p.PhotoId == updatedPhoto.PhotoId);
            if (photo != null)
            {
                photo.Title = updatedPhoto.Title;
                photo.Description = updatedPhoto.Description;
                photo.ModifiedDate = DateTime.Now;
                _dbContext.SaveChanges();
                return Ok(photo);
            }
            else
            {
                return NotFound();
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        [Route("DeletePhoto/{id}")]
        public IActionResult DeletePhoto(int id)
        {
            Photo photo = _dbContext.Photos.Include(p => p.RelatedComments).FirstOrDefault(p => p.PhotoId == id);
            if (photo != null)
            {
                _dbContext.Photos.Remove(photo);
                _dbContext.SaveChanges();
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        [Route("AddComment")]
        public IActionResult AddComment([FromBody] CommentDTO commentDTO)
        {
            Comment comment = new Comment
            {
                PhotoId = commentDTO.PhotoId,
                Body = commentDTO.Body,
                CreatedDate = DateTime.Now,
                UserName = User.Identity.Name
            };
            _dbContext.Comments.Add(comment);
            _dbContext.SaveChanges();
            List<Comment> comments = _dbContext.Comments.Where(c => c.PhotoId == comment.PhotoId).ToList();
            List<CommentDTO> commentDTOs = new List<CommentDTO>();
            comments.ForEach(c =>
            {
                CommentDTO cd = new CommentDTO()
                {
                    CommentId = c.CommentId,
                    PhotoId = c.PhotoId,
                    UserName = c.UserName,
                    Body = c.Body,
                    CreatedDate = c.CreatedDate
                };
                commentDTOs.Add(cd);
            });
            return Ok(commentDTOs);
        }
    }
}
