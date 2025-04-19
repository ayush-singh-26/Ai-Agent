import inquirer from 'inquirer';
import chalk from 'chalk';
import dotenv from 'dotenv';
import { generatePlan } from './agent/planner.js';
import { runPlan } from './agent/executor.js';

dotenv.config();

async function startAgent() {
    console.log(chalk.blue.bold('\n🤖 Welcome to your AI Task Agent\n'));

    const { task } = await inquirer.prompt([
        {
            type: 'input',
            name: 'task',
            message: '📝 What task do you want the agent to perform?',
        },
    ]);

    const plan = await generatePlan(task);

    console.log(chalk.green('\n🧠 Plan from Gemini:\n'));
    plan.forEach((step, index) => {
        console.log(`${index + 1}. ${step.description}`);
        console.log(chalk.gray(`   $ ${step.command}`));
    });

    const { confirm } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: '\nDo you want to execute this plan?',
        },
    ]);

    if (!confirm) return console.log(chalk.yellow('❌ Cancelled.'));

    const success = await runPlan(plan);

    const { worked } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'worked',
            message: '\n✅ Did the task complete successfully?',
        },
    ]);

    let retry = !worked;

    while (retry) {
        const { reason } = await inquirer.prompt([
            {
                type: 'input',
                name: 'reason',
                message: '❓ What went wrong?',
            },
        ]);

        const refinedTask = `${task}\nFix: ${reason}`;
        console.log(chalk.yellow('\n🔁 Re-planning with feedback...\n'));
        const retryPlan = await generatePlan(refinedTask);

        console.log(chalk.green('\n🔄 New Plan:\n'));
        retryPlan.forEach((step, index) => {
            console.log(`${index + 1}. ${step.description}`);
            console.log(chalk.gray(`   $ ${step.command}`));
        });

        const { confirmRetry } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirmRetry',
                message: '\nExecute this retry plan?',
            },
        ]);

        if (!confirmRetry) break;

        const retrySuccess = await runPlan(retryPlan);

        const { workedAgain } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'workedAgain',
                message: '✅ Did it work this time?',
            },
        ]);

        retry = !workedAgain;
    }

}

startAgent();
