﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using PhotoWebApi.Models;
using System;

namespace PhotoWebApi.Migrations.PhotoDb
{
    [DbContext(typeof(PhotoDbContext))]
    partial class PhotoDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("PhotoWebApi.Models.Comment", b =>
                {
                    b.Property<int>("CommentId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Body");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<int>("PhotoId");

                    b.Property<string>("UserName");

                    b.HasKey("CommentId");

                    b.HasIndex("PhotoId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("PhotoWebApi.Models.Photo", b =>
                {
                    b.Property<int>("PhotoId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<byte[]>("FileData");

                    b.Property<string>("FileName");

                    b.Property<string>("ImageMimeType");

                    b.Property<DateTime>("ModifiedDate");

                    b.Property<string>("Title")
                        .IsRequired();

                    b.Property<string>("UserName");

                    b.HasKey("PhotoId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("PhotoWebApi.Models.Comment", b =>
                {
                    b.HasOne("PhotoWebApi.Models.Photo", "RelatedPhoto")
                        .WithMany("RelatedComments")
                        .HasForeignKey("PhotoId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
