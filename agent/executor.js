import { exec } from 'child_process';
import chalk from 'chalk';

export function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.log(chalk.red(`❌ Error: ${stderr}`));
        reject(stderr);
      } else {
        console.log(chalk.green(`✅ Output:\n${stdout}`));
        resolve(stdout);
      }
    });
  });
}

export async function runPlan(plan) {
  for (const step of plan) {
    console.log(chalk.cyan(`\n→ ${step.description}`));
    console.log(chalk.gray(`$ ${step.command}`));
    try {
      await executeCommand(step.command);
    } catch (err) {
      console.log(chalk.red('⚠️  Command failed.'));
      return false; 
    }
  }
  return true;
}
