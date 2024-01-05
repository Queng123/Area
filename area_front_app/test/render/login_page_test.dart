import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:area_front_app/pages/auth/login_page.dart';
import 'package:area_front_app/components/generic_button.dart';
import 'package:area_front_app/components/styled_text_field.dart';

void main() {
  testWidgets('LoginPage should render correctly', (WidgetTester tester) async {
    await tester.pumpWidget(const MaterialApp(
      home: LoginPage(),
    ));

    expect(find.byType(StyledTextField), findsNWidgets(2));
    expect(find.byType(GenericButton), findsOneWidget);
    expect(find.text('Forgot Password?'), findsOneWidget);
    expect(find.text('Or'), findsOneWidget);
    expect(find.text('Not a member?'), findsOneWidget);
    expect(find.text('Register here'), findsOneWidget);
  });
}
