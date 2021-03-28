import { gitP } from 'simple-git';

export async function cloneGitRepo(url: string): Promise<unknown> {
    const git = gitP();
    return git.clone(url);
}
