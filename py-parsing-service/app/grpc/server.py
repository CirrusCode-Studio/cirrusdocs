# app/grpc/server.py

from concurrent import futures
import grpc

from app.grpc import parser_pb2_grpc
from app.grpc.parser_service import ParserService


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

    parser_pb2_grpc.add_ParserServiceServicer_to_server(
        ParserService(), server
    )

    server.add_insecure_port('[::]:50051')
    server.start()

    print("🚀 gRPC server running on port 50051")

    server.wait_for_termination()