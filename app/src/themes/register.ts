import type { Theme } from '@backoffice/themes';
import { useThemeStore } from '@backoffice/themes';

export const registerThemes = (themes: Theme[]) => {
	const themesStore = useThemeStore();
	themes.forEach((theme) => themesStore.registerTheme(theme));
};
