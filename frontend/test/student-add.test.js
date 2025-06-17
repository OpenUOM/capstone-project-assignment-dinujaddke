import { Selector } from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Student UI`
    .page`http://localhost:4401/student`;

test('Testing add students', async t => {
    await t.navigateTo("/dbinitialize");

    await t.navigateTo("/addStudent");
    await t.typeText("#student-id", "999999");
    await t.typeText("#student-name", "Pasindu Basnayaka");
    await t.typeText("#student-age", "45");
    await t.typeText("#student-Hometown", "Catholic");
    await t.click("#student-add");

    await t.wait(1000); // wait for add to complete

    await t.navigateTo("/student");

    const table = Selector('#student-table');
    const studentRow = table.find('tr').withText('Pasindu Basnayaka');

    await t.expect(studentRow.exists).ok({ timeout: 5000 });
});
