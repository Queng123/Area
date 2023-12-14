import 'package:flutter_test/flutter_test.dart';
import 'package:area_front_app/components/managers_routes/protocol/api_protocol_body.dart';

void main() {
  test('ApiProtocolBody Test', () {
    expect(ApiProtocolBody.getMessage('Sign Up', '201'), 'You have been successfully registered');
    expect(ApiProtocolBody.getMessage('Sign Up', '400'), 'This email is already used');
    expect(ApiProtocolBody.getMessage('Sign Up', '500'), 'An error occurred while registering');
    expect(ApiProtocolBody.getMessage('Unknown Title', '400'), 'An error occurred');
    expect(ApiProtocolBody.getMessage('Sign Up', '404'), 'An error occurred');
  });
}
