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
    expect(find.text('Already have an account?'), findsOneWidget);
    expect(find.text('Login'), findsOneWidget);

    expect(find.text('Adress Email'), findsOneWidget);
    expect(find.text('Password'), findsOneWidget);
    expect(find.text('Confirm Password'), findsOneWidget);

    await tester.enterText(find.byType(TextField).at(0), 'test@example.com');
    await tester.pump();

    await tester.enterText(find.byType(TextField).at(1), 'password123');
    await tester.pump();

    await tester.enterText(find.byType(TextField).at(2), 'password123');
    await tester.pump();

  });
}
