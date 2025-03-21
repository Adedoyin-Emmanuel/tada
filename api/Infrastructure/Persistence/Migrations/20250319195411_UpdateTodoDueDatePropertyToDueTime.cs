using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTodoDueDatePropertyToDueTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DueDate",
                table: "Todos");

            migrationBuilder.AddColumn<TimeOnly>(
                name: "DueTime",
                table: "Todos",
                type: "time(6)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DueTime",
                table: "Todos");

            migrationBuilder.AddColumn<DateTime>(
                name: "DueDate",
                table: "Todos",
                type: "datetime(6)",
                nullable: true);
        }
    }
}
