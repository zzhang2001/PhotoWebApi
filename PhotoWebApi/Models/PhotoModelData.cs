using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace PhotoWebApi.Models
{
    public class PhotoAddViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public IFormFile FileData { get; set; }
    }

    public class Photo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PhotoId { get; set; }

        [Required]
        public string Title { get; set; }

        public string FileName { get; set; }

        public byte[] FileData { get; set; }

        public string ImageMimeType { get; set; }

        [Required]
        public string Description { get; set; }

        public string UserName { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime ModifiedDate { get; set; }

        public virtual ICollection<Comment> RelatedComments { get; set; }
    }

    public class Comment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CommentId { get; set; }

        [ForeignKey("RelatedPhoto")]
        public int PhotoId { get; set; }

        public string UserName { get; set; }

        public string Body { get; set; }

        public DateTime CreatedDate { get; set; }

        public virtual Photo RelatedPhoto { get; set; }
    }

    // Photo Data Transfer Object
    public class PhotoDTO
    {
        public int PhotoId { get; set; }
        public string Title { get; set; }
        public string FileName { get; set; }
        public string ImageMimeType { get; set; }
        public string Description { get; set; }
        public string UserName { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public List<CommentDTO> RelatedComments { get; set; }
    }

    // Comment Data Transfer Object
    public class CommentDTO
    {
        public int CommentId { get; set; }
        public int PhotoId { get; set; }
        public string UserName { get; set; }
        public string Body { get; set; }
        public DateTime CreatedDate { get; set; }
    }

    public class PhotoDbContext : DbContext
    {
        public PhotoDbContext(DbContextOptions<PhotoDbContext> options) : base(options)
        {
        }

        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }

    public static class PhotoDbInitializer
    {
        public static void Initialize(PhotoDbContext context, string strRootPath)
        {
            // Ensure database is created.
            context.Database.EnsureCreated();

            // If DB has been seeded, return immediately.
            if (context.Photos.Any())
            {
                return;
            }

            List<Photo> photos = new List<Photo>
            {
                new Photo
                {
                    Title = "Blackberries",
                    FileName = "blackberries.JPG",
                    FileData = GetPhotoFileContent(strRootPath + "\\SamplePhotos\\blackberries.JPG"),
                    ImageMimeType = "image/jpeg",
                    Description = "This is a photo of blackberries.",
                    UserName = "user001",
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now
                },
                new Photo
                {
                    Title = "Coastalview",
                    FileName = "coastalview.JPG",
                    FileData = GetPhotoFileContent(strRootPath + "\\SamplePhotos\\coastalview.JPG"),
                    ImageMimeType = "image/jpeg",
                    Description = "This is a photo of coastal view.",
                    UserName = "user001",
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now
                },
                new Photo
                {
                    Title = "Flower",
                    FileName = "flower.JPG",
                    FileData = GetPhotoFileContent(strRootPath + "\\SamplePhotos\\flower.JPG"),
                    ImageMimeType = "image/jpeg",
                    Description = "This is a photo of flower.",
                    UserName = "user001",
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now
                },
                new Photo
                {
                    Title = "Fungi",
                    FileName = "fungi.JPG",
                    FileData = GetPhotoFileContent(strRootPath + "\\SamplePhotos\\fungi.JPG"),
                    ImageMimeType = "image/jpeg",
                    Description = "This is a photo of fungi.",
                    UserName = "user001",
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now
                },
                new Photo
                {
                    Title = "Headland",
                    FileName = "headland.JPG",
                    FileData = GetPhotoFileContent(strRootPath + "\\SamplePhotos\\headland.JPG"),
                    ImageMimeType = "image/jpeg",
                    Description = "This is a photo of headland.",
                    UserName = "user001",
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now
                },
                new Photo
                {
                    Title = "Orchard",
                    FileName = "orchard.JPG",
                    FileData = GetPhotoFileContent(strRootPath + "\\SamplePhotos\\orchard.JPG"),
                    ImageMimeType = "image/jpeg",
                    Description = "This is a photo of orchard.",
                    UserName = "user001",
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now
                },
                new Photo
                {
                    Title = "Path",
                    FileName = "path.JPG",
                    FileData = GetPhotoFileContent(strRootPath + "\\SamplePhotos\\path.JPG"),
                    ImageMimeType = "image/jpeg",
                    Description = "This is a photo of path.",
                    UserName = "user001",
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now
                },
                new Photo
                {
                    Title = "Ripples",
                    FileName = "ripples.JPG",
                    FileData = GetPhotoFileContent(strRootPath + "\\SamplePhotos\\ripples.JPG"),
                    ImageMimeType = "image/jpeg",
                    Description = "This is a photo of ripples.",
                    UserName = "user001",
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now
                }
            };
            photos.ForEach(p => context.Photos.Add(p));
            context.SaveChanges();

            List<Comment> comments = new List<Comment>
            {
                new Comment
                {
                    PhotoId = 1,
                    UserName = "user001@example.com",
                    Body = "The blackberries show up very clearly.",
                    CreatedDate = DateTime.Now
                },
                new Comment
                {
                    PhotoId = 1,
                    UserName = "user002@example.com",
                    Body = "It would be nice to have more colorful background.",
                    CreatedDate = DateTime.Now
                }
            };
            comments.ForEach(c => context.Comments.Add(c));
            context.SaveChanges();
        }

        private static byte[] GetPhotoFileContent(string strPath)
        {
            FileStream fs = new FileStream(strPath, FileMode.Open, FileAccess.Read);
            byte[] fileBytes;
            using (BinaryReader br = new BinaryReader(fs))
            {
                fileBytes = br.ReadBytes((int)fs.Length);
            }
            return fileBytes;
        }
    }
}
