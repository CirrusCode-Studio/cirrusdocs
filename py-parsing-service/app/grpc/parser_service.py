# app/grpc/parser_service.py

import json
from app.core.parser import parse_document
import grpc
from app.grpc import parser_pb2
from app.grpc import parser_pb2_grpc


class ParserService(parser_pb2_grpc.ParserServiceServicer):

    def Parse(self, request, context):
        try:
            file_url = request.file_url

            result = parse_document(file_url)

            return parser_pb2.ParseResponse(
                blocks_json=json.dumps(result["blocks"])
            )

        except Exception as e:
            context.set_details(str(e))
            context.set_code(grpc.StatusCode.INTERNAL)
            return parser_pb2.ParseResponse()