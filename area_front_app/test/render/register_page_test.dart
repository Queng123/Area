import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:area_front_app/pages/auth/register_page.dart';
import 'package:area_front_app/components/generic_button.dart';
import 'package:area_front_app/components/styled_text_field.dart';

void main() {
  testWidgets('RegisterPage should render correctly', (WidgetTester tester) async {
    await tester.pumpWidget(const MaterialApp(
      home: RegisterPage(),
    ));

    expect(find.byType(Image), findsOneWidget);
    expect(find.byType(StyledTextField), findsNWidgets(3));
    expect(find.byType(GenericButton), findsOneWidget);
    expect(find.byKey(const Key('logo_image')), findsOneWidget);
    expect(find.text('Forgot Password?'), findsOneWidget);
    expect(find.text('Have an account?'), findsOneWidget);
    expect(find.text('Login'), findsOneWidget);
  });
}
