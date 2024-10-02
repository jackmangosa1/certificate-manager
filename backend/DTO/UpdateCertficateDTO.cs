﻿using System.ComponentModel.DataAnnotations;

namespace CertificateManagerAPI.DTO
{
    public class UpdateCertficateDTO
    {
        [Required]
        public int SupplierId { get; set; }

        [Required]
        public int CertificateTypeId { get; set; }

        [Required]
        public string ValidFrom { get; set; } = null!;

        [Required]
        public string ValidTo { get; set; } = null!;


        [Required]
        public byte[] PdfDocumentData { get; set; } = null!;
    }
}
