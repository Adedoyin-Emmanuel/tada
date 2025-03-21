﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using api.Infrastructure.Persistence;

#nullable disable

namespace api.Infrastructure.Persistence.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20250319195411_UpdateTodoDueDatePropertyToDueTime")]
    partial class UpdateTodoDueDatePropertyToDueTime
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("api.Domain.Entities.Todo.Todo", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<int>("Category")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasDefaultValue(3);

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime(6)");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<DateTime>("CreatedAt"));

                    b.Property<TimeOnly?>("DueTime")
                        .HasColumnType("time(6)");

                    b.Property<bool>("IsDone")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("tinyint(1)")
                        .HasDefaultValue(false);

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<DateTime>("UpdatedAt")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime(6)");

                    MySqlPropertyBuilderExtensions.UseMySqlComputedColumn(b.Property<DateTime>("UpdatedAt"));

                    b.HasKey("Id");

                    b.ToTable("Todos");
                });

            modelBuilder.Entity("api.Domain.Entities.Todo.Todo", b =>
                {
                    b.OwnsMany("api.Domain.Entities.SubTodo.SubTodo", "SubTodos", b1 =>
                        {
                            b1.Property<Guid>("TodoId")
                                .HasColumnType("char(36)");

                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int");

                            MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b1.Property<int>("Id"));

                            b1.Property<bool>("IsDone")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("tinyint(1)")
                                .HasDefaultValue(false);

                            b1.Property<string>("Title")
                                .IsRequired()
                                .HasMaxLength(100)
                                .HasColumnType("varchar(100)");

                            b1.HasKey("TodoId", "Id");

                            b1.ToTable("SubTodo");

                            b1.WithOwner()
                                .HasForeignKey("TodoId");
                        });

                    b.Navigation("SubTodos");
                });
#pragma warning restore 612, 618
        }
    }
}
