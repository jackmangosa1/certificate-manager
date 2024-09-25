﻿using CertificateManagerAPI.DTO;

namespace CertificateManagerAPI.Repositories
{
    public interface IParticipantRespository
    {
        Task<ParticipantDTO> GetParticipantByName(string name);
        Task<ParticipantDTO> GetParticipantByFirstName(string name);
        Task<ParticipantDTO> GetParticipantByUserId(int id);
        Task<ParticipantDTO> GetParticipantByDepartment(string department);
        Task<ParticipantDTO> GetParticipantByPlant(string plant);
    }
}
