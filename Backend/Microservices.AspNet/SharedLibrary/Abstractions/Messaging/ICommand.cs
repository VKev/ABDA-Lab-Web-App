using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SharedLibrary.ResponseModel;
using MediatR;

namespace SharedLibrary.Abstractions.Messaging
{
    public interface ICommand: IRequest<Result>
    {
    }
    public interface ICommand<TResponse> : IRequest<Result<TResponse>>
    {
    }
}