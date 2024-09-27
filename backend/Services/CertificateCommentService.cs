﻿using CertificateManagerAPI.DTO;
using CertificateManagerAPI.Repositories;

namespace CertificateManagerAPI.Services
{
    public class CertificateCommentService : ICertificateCommentService
    {
        private readonly ICertificateCommentRepository _certificateCommentRepository;

        public CertificateCommentService(ICertificateCommentRepository certificateCommentRepository)
        {
            _certificateCommentRepository = certificateCommentRepository;
        }

        public async Task<CommentDTO> AddCommentToCertificate(int certificateId, CommentDTO commentDTO)
        {
            return await _certificateCommentRepository.AddCommentToCertificate(certificateId, commentDTO);
        }
    }
}
