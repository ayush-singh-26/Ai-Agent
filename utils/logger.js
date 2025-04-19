import chalk from 'chalk';

export function logStep(step) {
  console.log(chalk.yellow(`→ ${step.description}`));
  console.log(chalk.gray(`$ ${step.command}\n`));
}
