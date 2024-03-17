import { Command, CommandRunner, Option, OptionChoiceFor } from 'nest-commander';

/**
 * sample command app
 */
@Command({ name: 'seed' })
export class SeederCommand extends CommandRunner {
    private readonly choiceProvider: {
        getChoicesForRun: () => string[];
    }

    run(passedParams: string[], options?: { runSeed: any, revertSeed: any }): Promise<void> {
        console.log(options);

        return;
    }

    @Option({
        flags: '-r, --run',
        name: 'runSeed',
        description: 'Should the command use color in the output'
    })
    runSeeder(option: string) {
        return option;
    }

    @Option({
        flags: '-R, --revert [revertSeed]',
        name: 'revertSeed',
        description: 'Should the command use color in the output'
    })
    revertSeeder(option: string) {
        return option;
    }
}
