import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:area_front_app/components/styled_text_field.dart';

void main() {
  testWidgets('StyledTextField should render correctly', (WidgetTester tester) async {
    final TextEditingController textController = TextEditingController();
    await tester.pumpWidget(
      MaterialApp(
        home: Material(
          child: StyledTextField(
            controller: textController,
            hintText: 'Test Hint',
            obscureText: false,
          ),
        ),
      ),
    );
    expect(find.byType(Padding), findsOneWidget);
    expect(find.byType(TextField), findsOneWidget);
    expect(find.text('Test Hint'), findsOneWidget);
    expect(
      tester.widget<TextField>(find.byType(TextField).first).obscureText,
      equals(false),
    );
    expect(
      tester.widget<TextField>(find.byType(TextField).first).controller,
      equals(textController),
    );
  });
}
