using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Username { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public byte[]? RowVersion { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
}
